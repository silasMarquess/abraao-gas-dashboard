import { GetAllProductsResponse } from "../get-all-product/schema";

export type getAllContract = {
  id: string;
  quantity: number;
  condition: number;
  dateStart: string;
  dateEnd: string;
  status: number;
  product: GetAllProductsResponse;
};
