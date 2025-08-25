import { axiosInstance } from "@/lib/axios";
import { GetAllProductsResponse } from "./schema";

export const getAllproducts = async (): Promise<GetAllProductsResponse[]> => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
