"use client";

import { createNewClient } from "@/actions/create-client";
import { createClientSchema } from "@/actions/create-client/schema";
import { getAllRegions } from "@/actions/get-all-regions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const ClientRegisterPage = () => {
  const id_region = useSearchParams().get("id_region") || undefined;
  const router = useRouter();
  const createClientMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createClientSchema>) => {
      return createNewClient(data);
    },
  });

  const {
    data: regions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-all-regions"],
    queryFn: getAllRegions,
  });

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      fullName: "",
      StockGaz: "",
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw new Error("Erro ao carregar as regiões");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 space-y-4">
      <h3 className="font-semibold text-2xl">Cadastrar Novo Cliente</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            createClientMutation.mutate(data);
          })}
          className="space-y-9"
        >
          <Card className="flex flex-col items-center border w-[500px] h-auto py-4">
            <CardHeader className="flex flex-row w-full">
              <CardTitle className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-between items-center">
                  <Button
                    variant={"outline"}
                    className="text-sm font-light"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button className="text-sm font-light" type="submit">
                    Cadastrar Cliente
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 w-full flex flex-col items-left">
              <FormField
                control={form.control}
                name="regionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Região:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={id_region ? id_region : field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma região" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions?.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo cliente:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="exemplo: Silas Marques de Sousa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="StockGaz"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Stock (obs: aplicar-se aos atacadistas. Clientes normais
                      deve ser 0)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo: 100" {...field} />
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
  );
};

export default ClientRegisterPage;
