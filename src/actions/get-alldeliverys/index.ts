import { axiosInstance } from "@/lib/axios";
import z from "zod";
import { deliveryGetSchema } from "./schema";

export const getAllDeliverys = async (): Promise<
  z.infer<typeof deliveryGetSchema>[]
> => {
  try {
    const response = await axiosInstance.get("/delivery-man");
    return response.data as z.infer<typeof deliveryGetSchema>[];
  } catch (error) {
    console.error("Error fetching deliverys:", error);
    throw error;
  }
};
