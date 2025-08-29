"use client";

import { getClientByid } from "@/actions/get-client-by-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatToDateBR } from "@/helper/format-to-date";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { id } from "zod/v4/locales";
import ContractDetailsCard from "./components/card-clientContrac-info";
import { contractCondition } from "@/lib/condition_types";
import { constractStatus } from "@/lib/contract_status";
import { PlusIcon } from "lucide-react";

const ClientDetailsPage = () => {
  const id_client = useSearchParams().get("id_client");

  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getclient-by-id"],
    queryFn: () => getClientByid(id_client ?? ""),
  });
  console.log(client);

  if (isLoading) return <div>Loading....</div>;

  if (error) throw new Error("Erro a buscar dados do cliente");

  if (!id_client) return <div>Pagina Invalida...</div>;
  if (client?.constracts.length === 0) return <div>Sem Contratos</div>;

  return (
    <div className="flex flex-col w-full min-h-screen space-y-1 bg-gray-200  dark:bg-background p-3">
      <div className="flex flex-col w-full justify-center items-center h-auto rounded-md  bg-gray-100 dark:bg-background p-5">
        <div className="h-12 bg-linear-to-r w-full from-blue-900 to-primary rounded-md" />
        <div className="flex flex-row justify-between w-full items-center">
          {" "}
          <Card className="flex border-none bg-transparent mt-[-75px]">
            <CardContent>
              <div className="flex flex-col items-center justify-center p-3 space-y-2">
                <Image
                  src={"/profile-dark.svg"}
                  width={100}
                  height={100}
                  alt="profile-icon"
                  className="rounded-full border p-1 dark:bg-transparent bg-gray-300"
                ></Image>
                <span className="flex flex-col items-center">
                  {client?.fullName}
                  <p className="text-muted-foreground">
                    {client?.region.description}
                  </p>
                </span>
              </div>
            </CardContent>
          </Card>
          <Button
            className="rounded-full border-primary border"
            size={"lg"}
            variant={"ghost"}
          >
            Editar Dados
          </Button>
        </div>

        <hr className="w-full border-primary"></hr>
      </div>

      <div className="flex flex-col rounded-md  bg-gray-100 dark:bg-background p-2">
        <Tabs
          defaultValue="account"
          className="w-full border-b border-primary h-full bg-gray-100 dark:bg-background"
        >
          <TabsList className="">
            <TabsTrigger value="person-data" className="hover:bg-gray-200">
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="contracts" className="hover:bg-gray-200">
              Contratos com Deposito
            </TabsTrigger>

            <TabsTrigger value="salers" className="hover:bg-gray-200">
              Compras no Deposito
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="person-data"
            className="w-full flex flex-col items-center"
          >
            {" "}
            silas marques
          </TabsContent>
          <TabsContent value="contracts">
            <div className="flex flex-col w-full p-4 ">
              <h3>Lista de Contratos</h3>
              <div className="flex w-full flex-row gap-4 h-auto overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {client?.constracts.map((contract) => (
                  <ContractDetailsCard
                    key={contract.id}
                    client_name={client?.fullName}
                    condition={
                      contractCondition.find(
                        (e) => e.id === contract?.condition
                      )?.description
                    }
                    status={
                      constractStatus.find((e) => e.id === contract.status)
                        ?.description
                    }
                    quantity={contract.quantity}
                    data_end={formatToDateBR(contract.dateEnd)}
                    data_start={formatToDateBR(contract.dateStart)}
                    product_name={contract.product.description}
                  ></ContractDetailsCard>
                ))}
                <div className="flex flex-col h-full justify-center items-center">
                  <Button size={"default"}>
                    Adicionar <PlusIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-1/2 h-full p-4"></div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
