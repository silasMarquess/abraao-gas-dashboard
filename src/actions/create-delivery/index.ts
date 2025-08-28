import { axiosInstance } from "@/lib/axios";
import z from "zod";
import { createDeliverySchema } from "./schema";

export const createNewDelivery = async (
  values: z.infer<typeof createDeliverySchema>
): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.post("/delivery", values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
