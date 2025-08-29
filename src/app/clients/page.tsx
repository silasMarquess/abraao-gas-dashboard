"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import TableClientRegisters from "./components/table-registers";
import { useQuery } from "@tanstack/react-query";
import { getAllClients } from "@/actions/get-all-clients";

const ClientPage = () => {
  const {
    data: registers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-all-client"],
    queryFn: getAllClients,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw new Error("Failed to fetch clients");
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-5 bg-gray-200 dark:bg-background space-y-2.5">
      <div className="flex flex-col h-auto p-2  w-full items-center bg-white dark:bg-background rounded-md shadow-md space-y-2">
        <div className="w-full flex flex-row justify-between">
          <h3 className="font-semibold text-xl">Lista de clientes</h3>
          <Button className="font-light rounded-full" asChild>
            <Link href="/clients/register">Adicionar Novo Cliente</Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex-col">
        {/*tabela de produtos*/}
        <div className="flex flex-row w-full p-3  bg-white dark:bg-background rounded-md">
          <TableClientRegisters registers={registers} />
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
