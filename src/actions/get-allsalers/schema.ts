import z from "zod";
import { deliveryGetSchema } from "../get-alldeliverys/schema";
import { getAllTablePriceSchema } from "../get-all-tablePrices/schema";
import { getAllClientsSchema } from "../get-all-clients/schema";

export type getAllSalersSchema = {
  paymentType: number;
  date: string;
  valuePaidInCents: number;
  discountInCents: number;
  quantity: number;
  tablePrice: getAllTablePriceSchema;
  client: getAllClientsSchema;
  status: number;
  createdAt: string;
};
