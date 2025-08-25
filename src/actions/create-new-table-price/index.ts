import { axiosInstance } from "@/lib/axios";
import z from "zod";
import { createNewTablePriceSchema } from "./schema";

export const createNewPriceTable = async (
  values: z.infer<typeof createNewTablePriceSchema>,
  id_product: string | null
) => {
  try {
    console.log("Creating new price table:", id_product);
    const response = await axiosInstance.post("/table-prices", {
      ...values,
      id_products: id_product,
    });
    if (response.statusText != "OK")
      throw new Error("Failed to create price table");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
