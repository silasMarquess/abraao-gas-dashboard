"use client";

import { getAllRegions } from "@/actions/get-all-regions";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import TableRegionRegisters from "./components/table-registers";

const RegionPage = () => {
  const {
    data: regionList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: getAllRegions,
  });
  console.log(regionList);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching regions</div>;

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-5 bg-gray-200 space-y-2.5">
      <div className="flex flex-col h-auto p-2  w-full items-center bg-white rounded-md shadow-md space-y-2">
        <div className="w-full flex flex-row justify-between">
          <h3 className="font-semibold text-xl">Lista de Regiões</h3>
          <Button className="font-light rounded-full" asChild>
            <Link href="/regions/register">Adicionar Região</Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex-col">
        {/*tabela de produtos*/}
        <div className="flex flex-row w-full p-3 border bg-white rounded-md">
          <TableRegionRegisters regionList={regionList} />
        </div>
      </div>
    </div>
  );
};

export default RegionPage;
