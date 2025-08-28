export type getAllClientsSchema = {
  id: string;
  fullName: string;
  stockGaz: number;
  createdAt: string;
  region: {
    id: string;
    description: string;
    createdAt: string;
  };
};
