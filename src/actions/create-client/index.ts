import { axiosInstance } from "@/lib/axios";
import z from "zod";

import { createClientSchema } from "./schema";

export const createNewClient = async (
  values: z.infer<typeof createClientSchema>
) => {
  try {
    const response = await axiosInstance.post("/client", {
      ...values,
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
