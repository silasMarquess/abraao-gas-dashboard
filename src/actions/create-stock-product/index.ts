import z from "zod";
import { createdStockProductSchema } from "./schema";
import { axiosInstance } from "@/lib/axios";

export const createStockProductSchema = async (
  values: z.infer<typeof createdStockProductSchema>,
  id_product: string | null
) => {
  try {
    console.log("Creating stock product:", values);
    const response = await axiosInstance.post("/product-stock", {
      ...values,
      id_product,
    });
    return response.data;
  } catch (error) {
    // Handle validation errors
    console.error("Validation failed:", error);
  }
};
