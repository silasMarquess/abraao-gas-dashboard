import { axiosInstance } from "@/lib/axios";
import { RegionGetSchema } from "./schema";

export const getAllRegions = async (): Promise<RegionGetSchema[]> => {
  try {
    const allRegionsWithClients = await axiosInstance.get("/regions");
    return allRegionsWithClients.data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};
