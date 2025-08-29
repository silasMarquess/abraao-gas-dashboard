"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { list } from "../page";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import z from "zod";
import { getDeliveryByid } from "@/actions/get-deliveryMan-by-id";
import { formatToDateBR, formatToISO } from "@/helper/format-to-date";
import { useForm } from "react-hook-form";
import { deliveryCreateSchema } from "../register/page";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import router from "next/router";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { de } from "zod/v4/locales";

const DeliveryPageInfo = () => {
  const id_deliveryman = useSearchParams().get("id_deliveryman");
  if (!id_deliveryman) throw new Error("nemhum entregador selecionado");

  const {
    data: delivery,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getDeliveryByid(id_deliveryman ?? ""),
    queryKey: ["get-deliveryMan-by-id"],
  });

  const form = useForm<z.infer<typeof deliveryCreateSchema>>({
    resolver: zodResolver(deliveryCreateSchema),
    defaultValues: {
      fullName: delivery?.fullName ?? "",
      birthDate: formatToDateBR(delivery?.dateIn ?? "") ?? "",
      dateIn: formatToDateBR(delivery?.dateIn ?? "") ?? "",
    },
  });

  if (isLoading) return <div>Loading....</div>;

  if (error) throw new Error("Erro a buscar dados do entregador");

  if (!id_deliveryman) return <div>Pagina Invalida...</div>;

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
                  {delivery?.fullName}
                  <p className="text-muted-foreground">
                    Entregador desde: {formatToDateBR(delivery?.dateIn ?? "")}
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

      <div className="flex flex-col rounded-md grow bg-gray-100 dark:bg-background p-2">
        <Tabs
          defaultValue="account"
          className="w-full  h-full bg-gray-100 dark:bg-background"
        >
          <TabsList className="">
            <TabsTrigger value="person-data" className="hover:bg-gray-200">
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="deliveries" className="hover:bg-gray-200">
              Entregas Realizadas
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="person-data"
            className="w-full h-full flex flex-col items- justify-center"
          >
            <div className="flex flex-col w-auto h-full rounded-md items-center justify-center">
              {/* <div className="h-20 bg-linear-to-r w-full from-blue-900 to-primary rounded-md" /> */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    const formattedData = {
                      ...data,
                      birthDate: formatToISO(data.birthDate),
                      dateIn: formatToISO(data.dateIn),
                    };
                  })}
                  className="space-y-8"
                >
                  <Card className="flex flex-col items-center border-none w-[500px] h-auto py-4">
                    <CardHeader className="flex flex-row w-full">
                      <CardTitle className="flex flex-col w-full">
                        <div className="flex flex-row w-full justify-between items-center">
                          <Button
                            variant={"outline"}
                            className="text-sm font-light"
                            onClick={() => router.push("/deliverys")}
                          >
                            Cancelar
                          </Button>
                          <Button className="text-sm font-light" type="submit">
                            Salvar
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 w-full flex flex-col items-left">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome:</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="nome completo do entregador"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <PatternFormat
                                className="w-1/2"
                                customInput={Input}
                                {...field}
                                placeholder="dd/mm/aaaa"
                                format="##/##/####"
                              ></PatternFormat>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateIn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Admissão:</FormLabel>
                            <FormControl>
                              <PatternFormat
                                className="w-1/2"
                                customInput={Input}
                                {...field}
                                format="##/##/####"
                                placeholder="dd/mm/aaaa"
                              ></PatternFormat>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </form>
              </Form>{" "}
            </div>
          </TabsContent>

          <TabsContent value="deliveries"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeliveryPageInfo;
