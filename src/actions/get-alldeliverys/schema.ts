import z from "zod";

export const deliveryGetSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  birthDate: z.string(),
  dateIn: z.string(),
  createdAt: z.string(),
});
