import z from "zod";

export const createDeliverySchema = z.object({
  id_saler: z.string().min(1),
  id_deliveryman: z.string() || undefined,
});
