import z, { date } from "zod";

export const createSalerSchema = z.object({
  paymentType: z
    .string({ message: "Tipo de pagamento inválido" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Tipo de pagamento inválido",
    }),
  valuePaidInCents: z
    .string({ message: "Valor Pago inválido" })
    .min(0)
    .refine((val) => !isNaN(Number(val)), {
      message: "Valor Pago Inválido",
    }),
  discountInCents: z
    .string({ message: "Desconto inválido" })
    .min(0)
    .refine((val) => !isNaN(Number(val)), {
      message: "Valor de Desconto Inválido",
    }),
  quantity: z
    .number()
    .min(1)
    .refine((val) => !isNaN(Number(val)), {
      message: "Quantidade inválida",
    }),
  id_tableprice: z
    .string({ message: "ID da tabela de preço inválido" })
    .uuid("ID da tabela de preço inválido"),
  id_client: z
    .string({ message: "ID do cliente inválido" })
    .uuid("ID do cliente inválido"),
  status: z.number({ message: "Status inválido" }).optional(),
  date: z.string({ message: "Data inválida" }).optional(),
  id_delivery:
    z.string({ message: "ID da entrega inválido" }).optional() || null,
});
