"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatToDateBR } from "@/helper/format-to-date";
import { Label } from "@radix-ui/react-label";

interface pageProps {
  client_name: string;
  product_name: string;
  quantity: number | undefined;
  status: string | undefined;
  condition: string | undefined;
  data_start: string;
  data_end: string;
}

const ContractDetailsCard = ({
  client_name,
  product_name,
  condition,
  quantity,
  status,
  data_start,
  data_end,
}: pageProps) => {
  return (
    <div className="flex flex-col w-[300px]  p-0 items-center rounded-2xl bg-gray-200  dark:bg-gray-700">
      <div className="flex w-full mt-0 bg-linear-to-r h-4 rounded-tr-md rounded-t-lg from-blue-900 to-primary"></div>
      <Card className="w-full flex flex-col bg-transparent border-none">
        <CardHeader>
          <CardTitle>
            {product_name} - {condition}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            contrato de {client_name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full space-y-1">
            <Label>Status:{status}</Label>
            <Label>Data Inicio:{data_start}</Label>
            <Label>Data Final: {data_end ? data_end : "Ativo"}</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDetailsCard;
