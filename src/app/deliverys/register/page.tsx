"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { error } from "console";
import path from "path";
import { use } from "react";
import { useForm } from "react-hook-form";
import z, { any, unknown } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createNewDeliverys } from "@/actions/create-deliveryman";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatToISO } from "@/helper/format-to-date";

export const deliveryCreateSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  dateIn: z.string().refine(
    (date) => {
      const [day, month, year] = date.split("/").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      return (
        parsedDate instanceof Date &&
        !isNaN(parsedDate.getTime()) &&
        date ===
          `${String(day).padStart(2, "0")}/${String(month).padStart(
            2,
            "0"
          )}/${year}`
      );
    },
    { message: "Data de admissão inválida" }
  ),
  birthDate: z.string().refine(
    (date) => {
      const [day, month, year] = date.split("/").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      return (
        parsedDate instanceof Date &&
        !isNaN(parsedDate.getTime()) &&
        date ===
          `${String(day).padStart(2, "0")}/${String(month).padStart(
            2,
            "0"
          )}/${year}`
      );
    },
    { message: "Data de nascimento inválida" }
  ),
});

const DeliveryRegisterPage = () => {
  const queryClient = useQueryClient();
  const createDeliveryMutation = useMutation({
    mutationFn: (values: z.infer<typeof deliveryCreateSchema>) =>
      createNewDeliverys(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-delivery"] });
      toast.success("Entregador cadastrado com sucesso!");
      router.push("/deliverys");
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar entregador");
      console.error("Error creating delivery:", error);
    },
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof deliveryCreateSchema>>({
    resolver: zodResolver(deliveryCreateSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      dateIn: undefined,
    },
  });

  // Função para converter dd/mm/yyyy para yyyy-mm-dd
  function toISODate(dateStr: string) {
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-background space-y-4">
      <h3 className="font-semibold text-2xl">Cadastrar Entregador</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            const formattedData = {
              ...data,
              birthDate: formatToISO(data.birthDate),
              dateIn: formatToISO(data.dateIn),
            };
            createDeliveryMutation.mutate(formattedData);
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
                    onClick={() => router.push("/deliverys")}
                  >
                    Cancelar
                  </Button>
                  <Button className="text-sm font-light" type="submit">
                    Cadastrar Entregador
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
  );
};

export default DeliveryRegisterPage;
