import { axiosInstance } from "@/lib/axios";
import { getAllTablePriceSchema } from "./schema";

export const getAllVariantsPrice = async (): Promise<
  getAllTablePriceSchema[]
> => {
  try {
    const response = await axiosInstance.get("/table-prices");
    return response.data as getAllTablePriceSchema[];
  } catch (error) {
    console.error("Error fetching table prices:", error);
    throw new Error("Failed to fetch table prices");
  }
};
