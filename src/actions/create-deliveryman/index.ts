import { axiosInstance } from "@/lib/axios";
import z from "zod";

import { deliveryCreateSchema } from "@/app/deliverys/register/page";

export const createNewDeliverys = async (
  values: z.infer<typeof deliveryCreateSchema>
) => {
  try {
    const response = await axiosInstance.post("/delivery-man", {
      ...values,
    });
  } catch (error) {
    console.error("Error fetching deliverys:", error);
    throw error;
  }
};
