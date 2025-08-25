import z from "zod";

export const createdStockProductSchema = z.object({
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(255, "Descrição deve ter no máximo 255 caracteres"),
  stock: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Estoque deve ser um número",
  }),
});
