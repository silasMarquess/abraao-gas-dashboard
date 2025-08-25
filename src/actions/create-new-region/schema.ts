import z from "zod";

export const createNewRegionSchema = z.object({
  description: z
    .string()
    .min(2, "Descrição muito curta")
    .max(100, "Descrição muito longa"),
});
