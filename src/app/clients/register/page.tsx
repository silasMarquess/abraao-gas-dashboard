"use client";

import { createNewClient } from "@/actions/create-client";
import { createClientSchema } from "@/actions/create-client/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const ClientRegisterPage = () => {
  const router = useRouter();
  const createClientMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createClientSchema>) => {
      return createNewClient(data);
    },
  });

  console.log(createClientMutation.data);

  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      fullName: "",
      StockGaz: "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 space-y-4">
      <h3 className="font-semibold text-2xl">Cadastrar Novo Cliente</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            createClientMutation.mutate(data);
          })}
          className="space-y-8"
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
