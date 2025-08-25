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

  const createdProductPriceMutation = useMutation({
    mutationFn: (data: z.infer<typeof createNewTablePriceSchema>) =>
      createNewPriceTable(data, id_product),
    onSuccess: () => {
      toast.success("Novo Preço Associado criado com sucesso!");
      router.push("/product/prices");
    },
    onError: (error: any) => {
      toast.error("Erro ao criar novo preço associado");
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof createNewTablePriceSchema>>({
    resolver: zodResolver(createNewTablePriceSchema),
    defaultValues: {
      description: "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 space-y-4">
      <h3 className="font-semibold text-2xl">Cadastrar Novas Variantes</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            data.priceInCents = String(
              formatToCents(Number(data.priceInCents))
            );
            createdProductPriceMutation.mutate(data);
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
                    Cadastrar Variante
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
                    <FormLabel>Descrição da Variante:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descrição da nova variante de preço"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceInCents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Preço em Reais"
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
