"use client";

import { createNewPriceTable } from "@/actions/create-new-table-price";
import {
  createNewTablePriceSchema as baseSchema,
  createNewTablePriceSchema,
} from "@/actions/create-new-table-price/schema";
import { createdProduct } from "@/actions/create-product";
import { productCreateSchema } from "@/actions/create-product/schema";
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import z from "zod";
import { formatToCents } from "@/helper/format-to-cents";
import { createdStockProductSchema } from "@/actions/create-stock-product/schema";
import { createStockProductSchema } from "@/actions/create-stock-product";

// Ajuste para validar campo numérico

const ProductPriceRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id_product = searchParams.get("id_product");
  const nameProduct = searchParams.get("name_product");

  if (!id_product) {
    toast.error("Produto não selecionado");
    router.push("/product/prices");
  }

  const createdProductStockMutation = useMutation({
    mutationFn: (data: z.infer<typeof createdStockProductSchema>) =>
      createStockProductSchema(data, id_product),
    onSuccess: () => {
      toast.success("Novo Estoque Associado criado com sucesso!");
      router.push("/product/prices");
    },
    onError: (error: any) => {
      toast.error("Erro ao criar novo estoque associado");
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof createdStockProductSchema>>({
    resolver: zodResolver(createdStockProductSchema),
    defaultValues: {
      description: "",
      stock: "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200  dark:bg-background space-y-4">
      <h3 className="font-semibold text-2xl">
        Cadastrar Novos Tipos de Estoque
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            createdProductStockMutation.mutate(data);
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
                    Cadastrar Stock Associado
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 w-full flex flex-col items-left">
              <FormItem>
                <FormLabel>Produto Selecionado:</FormLabel>
                <Input
                  className="font-semibold text-red-600"
                  placeholder="Produto Alvo"
                  value={nameProduct || ""}
                  readOnly
                  // disabled={true}
                />
              </FormItem>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Stock:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="exemplo: vazilhames vazios"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Quantidade exemplo:0"
                        defaultValue={0}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
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

export default ProductPriceRegister;
