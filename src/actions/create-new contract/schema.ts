import z from "zod";

export const createContractSchema = z.object({
  id_client: z.string({ message: "Cliente selecionado invalido" }),
  id_product: z.string({ message: "Produto selecionado invalido" }),
  quantity: z.number({ message: "Quantidade invalida" }),
});
