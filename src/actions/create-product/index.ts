import { ca } from "zod/v4/locales";
import { productCreateSchema } from "./schema";
import z from "zod";
import { axiosInstance } from "@/lib/axios";

export const createdProduct = async (
  values: z.infer<typeof productCreateSchema>
) => {
  try {
    const response = await axiosInstance.post("/products", values);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
  }
};
