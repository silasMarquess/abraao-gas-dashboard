import z from "zod";
import { createSalerSchema } from "./schema";
import { axiosInstance } from "@/lib/axios";

export const createdNewSaler = async (
  values: z.infer<typeof createSalerSchema>
) => {
  try {
    const response = await axiosInstance.post("/saler", values);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
