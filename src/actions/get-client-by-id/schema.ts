import { getAllContract } from "../get-all-contracts/schema";

export type getClientByIdSchema = {
  id: string;
  fullName: string;
  constracts: Array<getAllContract>;
  region: {
    id: string;
    description: string;
    createdAt: string;
  };
  createdAt: string;
};
