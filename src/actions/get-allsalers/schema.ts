import z from "zod";
import { deliveryGetSchema } from "../get-alldeliverys/schema";
import { getAllTablePriceSchema } from "../get-all-tablePrices/schema";
import { getAllClientsSchema } from "../get-all-clients";

export type getAllSalersSchema = {
  paymentType: number;
  date: string;
  valuePaidInCents: number;
  discountInCents: number;
  quantity: number;
  deliveryMan: z.infer<typeof deliveryGetSchema>;
  tablePrice: getAllTablePriceSchema;
  client: getAllClientsSchema;
};
    