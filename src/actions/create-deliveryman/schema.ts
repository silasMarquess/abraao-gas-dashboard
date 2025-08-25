import z from "zod";

export const deliveryGetSchema = z.object({
  fullName: z.string().min(2).max(100),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
