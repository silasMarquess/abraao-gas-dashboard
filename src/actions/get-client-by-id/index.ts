import { axiosInstance } from "@/lib/axios";
import { getClientByIdSchema } from "./schema";

export const getClientByid = async (
  clientId: string
): Promise<getClientByIdSchema | undefined> => {
  try {
    const response = await axiosInstance.get(`/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
