import { axiosInstance } from "@/lib/axios";
import z from "zod";
import { deliveryGetSchema } from "../create-deliveryman/schema";

export type delivery = z.infer<typeof deliveryGetSchema>;
export const getDeliveryByid = async (
  id: string
): Promise<delivery | undefined> => {
  try {
    const response = await axiosInstance.get(`/delivery-man/${id}`);
    return response.data;
  } catch (erro) {
    console.log(erro);
  }
};
