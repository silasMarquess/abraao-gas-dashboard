import z from "zod";

export const createClientSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Nome completo deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome completo deve ter no máximo 100 caracteres" }),
  StockGaz: z.string().refine((val) => !isNaN(Number(val)), {
    message: "StockGaz deve ser um número",
  }),
});
