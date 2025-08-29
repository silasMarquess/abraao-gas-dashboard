import z from "zod";
import { createContractSchema } from "./schema";
import { axiosInstance } from "@/lib/axios";

export const createNewContrat = async (
  values: z.infer<typeof createContractSchema>
) => {
  try {
    const response = await axiosInstance.post("/contract", values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
