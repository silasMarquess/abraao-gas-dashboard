"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllDeliverys } from "@/actions/get-alldeliverys";
import { getAllproducts } from "@/actions/get-all-product";
import ProductTableRegiste from "./(components)/table-product-registers";
import ProductTableRegister from "./(components)/table-product-registers";

const DeliveryPage = () => {
  const {
    data: productList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllproducts,
  });

  console.log("Product List:", productList);
  if (isLoading) return <div>Loading...</div>;
  if (!productList) return <div>No data available</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-5 bg-gray-200 dark:bg-background space-y-2.5">
      <div className="flex flex-col h-auto p-2  w-full items-center bg-white dark:bg-background rounded-md shadow-md space-y-2">
        <div className="w-full flex flex-row justify-between">
          <h3 className="font-semibold text-xl">Lista de Produtos</h3>
          <Button className="font-light rounded-full" asChild>
            <Link href="/product/product-register">Adicionar Produto</Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex-col">
        {/*tabela de produtos*/}
        <div className="flex flex-row w-full p-3 bg-white  dark:bg-background rounded-md">
          {/*@ts-ignore*/}
          <ProductTableRegister productList={productList} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
