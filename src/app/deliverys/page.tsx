"use client";

import { Button } from "@/components/ui/button";
import DeliveryTableRegister from "./components/table-register";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllDeliverys } from "@/actions/get-alldeliverys";

export const list = [
  {
    id: "1",
    fullName: "John Doe",
    dateBirth: "1990-01-01",
    dateIn: "2020-01-01",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    dateBirth: "1992-02-02",
    dateIn: "2021-02-02",
  },
  {
    id: "3",
    fullName: "Alice Johnson",
    dateBirth: "1995-03-03",
    dateIn: "2022-03-03",
  },
  {
    id: "4",
    fullName: "Bob Brown",
    dateBirth: "1988-04-04",
    dateIn: "2023-04-04",
  },
  {
    id: "5",
    fullName: "Charlie Davis",
    dateBirth: "1990-05-05",
    dateIn: "2020-05-05",
  },
  {
    id: "6",
    fullName: "John Doe",
    dateBirth: "1990-01-01",
    dateIn: "2020-01-01",
  },
  {
    id: "7",
    fullName: "Jane Smith",
    dateBirth: "1992-02-02",
    dateIn: "2021-02-02",
  },
  {
    id: "8",
    fullName: "Alice Johnson",
    dateBirth: "1995-03-03",
    dateIn: "2022-03-03",
  },
  {
    id: "9",
    fullName: "Bob Brown",
    dateBirth: "1988-04-04",
    dateIn: "2023-04-04",
  },
  {
    id: "10",
    fullName: "Charlie Davis",
    dateBirth: "1990-05-05",
    dateIn: "2020-05-05",
  },
];

const DeliveryPage = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["get-all-delivery"],
    queryFn: getAllDeliverys,
  });

  console.log("client data:", data?.length);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-5 bg-gray-200  dark:bg-background space-y-2.5">
      <div className="flex flex-col h-auto p-3  w-full items-center bg-white dark:bg-background rounded-md shadow-md space-y-4">
        <div className="w-full flex flex-row justify-between">
          <h3 className="font-semibold text-2xl">Lista de Entregadores</h3>
          <Button className="font-light rounded-full" asChild>
            <Link href="/deliverys/register">Adicionar Entregador</Link>
          </Button>
        </div>
        <hr className="w-full border-t border-primary" />
        <DeliveryTableRegister deliveryList={data} />
      </div>
    </div>
  );
};

export default DeliveryPage;
