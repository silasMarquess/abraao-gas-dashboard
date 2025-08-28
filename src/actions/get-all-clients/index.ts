import { axiosInstance } from "@/lib/axios";
import { getAllClientsSchema } from "./schema";

export const getAllClients = async (): Promise<getAllClientsSchema[]> => {
  try {
    const response = await axiosInstance.get("/clients");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch clients");
  }
};
