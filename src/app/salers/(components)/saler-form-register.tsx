"use client";

import {
  createSalerSchema as baseSalerSchema,
  createSalerSchema,
} from "@/actions/create-new-saler/schema";
import { getAllVariantsPrice } from "@/actions/get-all-tablePrices";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { convertToReal } from "@/helper/format-to-real";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z, { file, set } from "zod";
import ClientListCombobox from "./client-combobox-search";
import { getAllClients } from "@/actions/get-all-clients";
import { Input } from "@/components/ui/input";
import { paymentsType } from "@/lib/payment_type";
import { Label } from "@/components/ui/label";
import { getAllDeliverys } from "@/actions/get-alldeliverys";
import { createdNewSaler } from "@/actions/create-new-saler";
import { Toggle } from "@/components/ui/toggle";
import { createDeliverySchema } from "@/actions/create-delivery/schema";
import { createNewDelivery } from "@/actions/create-delivery";
import { useRouter } from "next/navigation";

const SalerFormRegister = () => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [isDelivery, setisDelivery] = useState<boolean>(false);

  const form = useForm<z.infer<typeof createSalerSchema>>({
    resolver: zodResolver(createSalerSchema),
    defaultValues: {
      quantity: 1,
      status: 1,
      discountInCents: "0",
      valuePaidInCents: " 0",
      id_delivery: undefined,
    },
  });

  const createNewDeliveryMuation = useMutation({
    mutationFn: (data: z.infer<typeof createDeliverySchema>) => {
      return createNewDelivery(data);
    },
  });

  const createSalerMutation = useMutation({
    mutationFn: (data: z.infer<typeof baseSalerSchema>) => {
      return createdNewSaler(data);
    },
    onSuccess: (salerId) => {
      toast.success("Venda finalizada com sucesso! ");

      if (isDelivery && form.getValues("id_delivery")) {
        const newdelivery: z.infer<typeof createDeliverySchema> = {
          id_saler: salerId,
          id_deliveryman: form.getValues("id_delivery") || "",
        };
        createNewDeliveryMuation.mutate(newdelivery);
        toast.success("Ordem de Entrega criada com sucesso! ");
      }
    },
    onError: (err) => {
      toast.error("Erro ao finalizar venda! ");
      console.log(err);
    },
  });

  const {
    data: clientList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-all-clients-register"],
    queryFn: getAllClients,
  });

  const {
    data: tablePrices,
    isLoading: isLoadingPrices,
    error: errorPrices,
  } = useQuery({
    queryKey: ["get-all-prices"],
    queryFn: getAllVariantsPrice,
  });

  const {
    data: tableDeliverys,
    isLoading: isLoadingDelivery,
    error: errorDelivery,
  } = useQuery({
    queryKey: ["get-all-deliverys"],
    queryFn: getAllDeliverys,
  });

  const [
    watchedTablePriceId,
    watchedQuantity,
    watchedDiscount,
    watchedValuePaid,
    wathcedValuePay,
  ] = form.watch([
    "id_tableprice",
    "quantity",
    "discountInCents",
    "valuePaidInCents",
    "paymentType",
  ]);

  useEffect(() => {
    if (!watchedTablePriceId || !tablePrices) {
      setSubTotal(0);
      return;
    }

    const priceInCents = tablePrices.find(
      (price) => price.id === watchedTablePriceId
    )?.priceInCents;

    if (!priceInCents) {
      setSubTotal(0);
      return;
    }

    const totalInCents = priceInCents * (watchedQuantity || 0);
    const discountInCents = (watchedDiscount || 0) * 100;
    const valuePaidInCents = (watchedValuePaid || 0) * 100;

    setSubTotal(totalInCents - discountInCents - valuePaidInCents);
  }, [
    watchedTablePriceId,
    watchedQuantity,
    watchedDiscount,
    watchedValuePaid,
    tablePrices,
  ]);

  if (isLoading || isLoadingPrices) return <div>Loading...</div>;
  if (error || errorPrices) return <div>Error loading clients or prices</div>;

  // Assiste aos campos relevantes para o cálculo do subtotal

  // Centraliza o cálculo do subtotal em um useEffect

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if ((isDelivery && !data.id_delivery) || data.id_delivery === "") {
            form.setError("id_delivery", {
              message: "Selecione um entregador para o serviço de entrega",
            });
            return;
          }
          data.status = wathcedValuePay === "6" ? 0 : 1;
          data.date = new Date().toISOString();
          createSalerMutation.mutate(data);
        })}
        className="w-full h-full overflow-x-scroll"
      >
        <Card className="flex flex-col items-center w-full h-full border-none">
          <CardContent className="space-y-4 w-full flex flex-col items-left ">
            <FormField
              control={form.control}
              name="id_client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <ClientListCombobox
                    clientList={clientList}
                    fieldValue={field}
                    form={form}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_tableprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tabela de Preços</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("quantity", 1, { shouldDirty: true });
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a tabela" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="flex w-full">
                      {tablePrices?.map((price) => (
                        <SelectItem key={price.id} value={price.id}>
                          {price.description}:{" "}
                          {convertToReal(price.priceInCents)}
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
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center  justify-between space-x-1 bg-muted rounded-md p-2">
                    <div className="flex flex-col items-center">
                      <Button
                        type="button"
                        disabled={!watchedTablePriceId}
                        className="px-2 py-1 rounded-md"
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => {
                          field.onChange(field.value + 1);
                        }}
                      >
                        <PlusIcon />
                      </Button>
                      <span>{field.value}</span>
                      <Button
                        type="button"
                        disabled={!watchedTablePriceId}
                        className="px-2 py-1 rounded-md"
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => {
                          if (field.value === 1) {
                            toast.error(
                              "Quantidade não pode ser menor do que 1"
                            );
                          } else {
                            field.onChange(field.value - 1);
                          }
                        }}
                      >
                        <MinusIcon />
                      </Button>
                    </div>
                    <div className="flex flex-row gap-0.5">
                      {" "}
                      <Button
                        type="button"
                        disabled={!watchedTablePriceId}
                        className="px-3 py-1 rounded-md"
                        size={"icon"}
                        onClick={() => {
                          field.onChange(field.value + 50);
                        }}
                      >
                        <span className="flex flex-row items-center justify-center p-1 text-xs">
                          50+
                        </span>
                      </Button>
                      <Button
                        type="button"
                        disabled={!watchedTablePriceId}
                        className="px-3 py-1 rounded-md"
                        size={"icon"}
                        onClick={() => {
                          field.onChange(field.value + 100);
                        }}
                      >
                        <span className="flex flex-row items-center justify-center p-1 text-xs">
                          100+
                        </span>
                      </Button>
                    </div>

                    <span className="px-3 text-primary flex flex-col text-md relative mr-1 space-y-1 items-center">
                      {convertToReal(subTotal)}
                      {wathcedValuePay === "6" && (
                        <p className="text-xs text-muted-foreground">
                          Obs: Valor á Prazo
                        </p>
                      )}
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meio de Pagamento</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um meio de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="flex w-full">
                      {paymentsType?.map((method) => (
                        <SelectItem
                          key={method.id}
                          value={method.id.toString()}
                        >
                          {method.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row w-full p-1 gap-2">
              <FormField
                control={form.control}
                name="discountInCents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desconto Integral:</FormLabel>

                    <div className="flex relative items-center">
                      <Input {...field} placeholder="0,00" className="p-2" />

                      <span className=" absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                        R$
                      </span>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {wathcedValuePay === "6" && (
                <FormField
                  control={form.control}
                  name="valuePaidInCents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Pago:</FormLabel>
                      <div className="flex relative items-center">
                        <Input {...field} placeholder="0,00" className="p-2" />
                        <span className=" absolute right-2 top-1/2 -translate-y-1/2  text-gray-400 p-1">
                          R$
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div>
              <Toggle
                about="delivery-on"
                aria-label="delivery-on"
                onPressedChange={(pressed) => {
                  setisDelivery(pressed);
                }}
                className="data-[state=on]:bg-primary data-[state=on]:text-white border bg-muted cursor-pointer"
              >
                <span>
                  Serviço de Entrega: {isDelivery ? "Ativo" : "Inativo"}
                </span>
              </Toggle>
            </div>
            {/**serviço de entrega */}
            {isDelivery === true && (
              <div className=" w-full border rounded-md p-2 flex flex-col space-y-5 bg-muted">
                <h3>Serviço de Entrega</h3>
                <div className="flex flex-col space-y-1">
                  {" "}
                  <FormField
                    control={form.control}
                    name="id_delivery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entregadores Disponíveis</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full  bg-white">
                              <SelectValue placeholder="Selecione um entregador" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="flex w-full">
                            {tableDeliverys?.map((delivery) => (
                              <SelectItem key={delivery.id} value={delivery.id}>
                                {delivery.fullName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            <CardFooter className="w-full mt-70">
              <Button className="w-full" type="submit">
                Finalizar Venda
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default SalerFormRegister;
