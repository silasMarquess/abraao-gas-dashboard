import { getAllProductStockSchema } from "../get-all-productStock/schema";
import { getAllTablePriceSchema } from "../get-all-tablePrices/schema";
import { getProductstockSchema } from "../get-productStock/schema";

export type GetProductsByIdResponse = {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  productStock: getAllProductStockSchema[];
  prices: getAllTablePriceSchema[];
};
