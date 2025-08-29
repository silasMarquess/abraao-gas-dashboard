import z from "zod";

export const createClientSchema = z.object({
  fullName: z
    .string({ message: "Nome do cliente invalido" })
    .min(2, { message: "Nome completo deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome completo deve ter no máximo 100 caracteres" }),
  regionId: z
    .string({ required_error: "Região é obrigatória" })
    .min(1, { message: "Região é obrigatória" }),
});
