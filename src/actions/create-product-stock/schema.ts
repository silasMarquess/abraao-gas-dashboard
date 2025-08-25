import z from "zod";

export const productStockCreateSchema = z.object({
  description: z.string().min(2).max(100),
  stock: z.number().min(0),
  id_product: z.string().uuid(),
});
