import z from "zod";

export const productCreateSchema = z.object({
  description: z
    .string()
    .min(3, "Descrição deve ter pelo menos 3 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
});
