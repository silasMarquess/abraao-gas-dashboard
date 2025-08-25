import { GetAllProductsResponse } from "../get-all-product/schema";

export type getProductstockSchema = {
  id: string;
  description: string;
  stock: number;
  product: GetAllProductsResponse;
};
