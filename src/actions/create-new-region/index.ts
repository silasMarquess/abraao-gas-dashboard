import { axiosInstance } from "@/lib/axios";
import z from "zod";
import { createNewRegionSchema } from "./schema";

export const createNewRegion = async (
  values: z.infer<typeof createNewRegionSchema>
) => {
  try {
    const response = await axiosInstance.post("regions", { ...values });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
