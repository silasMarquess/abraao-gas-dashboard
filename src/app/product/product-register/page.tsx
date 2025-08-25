"use client";

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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const ProductRegisterContainer = () => {
  const router = useRouter();

  const createdProductMutation = useMutation({
    mutationFn: (data: z.infer<typeof productCreateSchema>) =>
      createdProduct(data),
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      router.push("/product");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error("Erro ao criar produto");
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof productCreateSchema>>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      description: "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 space-y-4">
      <h3 className="font-semibold text-2xl">Cadastrar Novos Produtos</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            createdProductMutation.mutate(data)
          )}
          className="space-y-8"
        >
          <Card className="flex flex-col items-center border w-[500px] h-auto py-4">
            <CardHeader className="flex flex-row w-full">
              <CardTitle className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-between items-center">
                  <Button
                    variant={"outline"}
                    className="text-sm font-light"
                    onClick={() => router.push("/product")}
                  >
                    Cancelar
                  </Button>
                  <Button className="text-sm font-light" type="submit">
                    Cadastrar Produto
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
                    <FormLabel>Descrição do Produto:</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição do Produto" {...field} />
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

export default ProductRegisterContainer;
