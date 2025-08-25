import { getAllClientsSchema } from "../get-all-clients";

export type RegionGetSchema = {
  id: string;
  description: string;
  createdAt: string;
  clients: Array<getAllClientsSchema>;
};
