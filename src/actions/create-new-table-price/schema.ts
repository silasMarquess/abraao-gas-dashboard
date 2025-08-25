import z from "zod";

export const createNewTablePriceSchema = z.object({
  description: z
    .string()
    .min(2, "Descrição muito curta")
    .max(100, "Descrição muito longa"),
  priceInCents: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Preço deve ser um número",
  }),
});
