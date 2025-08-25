"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonPros {
  url: string;
}

const AddButton = ({ url }: ButtonPros) => {
  const router = useRouter();
  return (
    <Button
      className="rounded-md bg-gray-200 w-full text-black"
      size={"sm"}
      onClick={() => router.push(url)}
    >
      <PlusIcon />
      <span className="ml-2">Adicionar</span>
    </Button>
  );
};

export default AddButton;
