"use client";

import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export interface ListPropertyProductProps {
  id_resources: string;
  url: string;
  content: string;
  value: string;
}

const ListPropertyProduct = ({
  value,
  id_resources,
  url,
  content,
}: ListPropertyProductProps) => {
  const router = useRouter();
  console.log(value);
  return (
    <div
      className="flex flex-row p-0.5 rounded-md border w-auto justify-between items-center  mb-1 bg-gray-200
    "
    >
      <span className="font-light gap-1">
        <p>{content}:</p>
        <p className="font-medium">{value}</p>
      </span>
      <Button size="icon" variant={"ghost"} onClick={() => router.push(url)}>
        {" "}
        <ChevronRightIcon />{" "}
      </Button>
    </div>
  );
};

export default ListPropertyProduct;
