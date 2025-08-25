"use client";

import { createNewClient } from "@/actions/create-client";
import { createClientSchema } from "@/actions/create-client/schema";
import { createNewRegion } from "@/actions/create-new-region";
import { createNewRegionSchema } from "@/actions/create-new-region/schema";
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
import { toast } from "sonner";
import z from "zod";

const RegionRegisterPage = () => {
  const router = useRouter();
  const createRegionMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createNewRegionSchema>) => {
      return createNewRegion(data);
    },
    mutationKey: ["create-new-region"],
    onSuccess: () => {
      router.push("/regions");
      toast.success("Região criada com sucesso!");
    },

    onError: (error: any) => {
      toast.error("Erro ao criar região");
      console.log(error);
    },
  });

  console.log(createRegionMutation.data);

  const form = useForm<z.infer<typeof createNewRegionSchema>>({
    resolver: zodResolver(createNewRegionSchema),
    defaultValues: {
      description: "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 space-y-4">
      <h3 className="font-semibold text-2xl">Cadastrar Nova Região</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            createRegionMutation.mutate(data);
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
                    Cadastrar Região
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 w-full flex flex-col items-left">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da Região:</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo: Nova mocuíba" {...field} />
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

export default RegionRegisterPage;
