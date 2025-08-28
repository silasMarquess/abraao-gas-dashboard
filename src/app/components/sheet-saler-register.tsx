"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasketIcon } from "lucide-react";
import SalerFormRegister from "../salers/(components)/saler-form-register";

const SheetSalerRegister = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} className="border-0 hover:bg-primary rounded-full">
          <ShoppingBasketIcon size={40} />
          <span>Nova Venda</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-1 justify-start border-0">
        <SheetHeader>
          <SheetTitle>Registro de Vendas</SheetTitle>
          <SheetDescription>Preencha os dados da venda</SheetDescription>
          <hr />
        </SheetHeader>
        <SalerFormRegister />
      </SheetContent>
    </Sheet>
  );
};

export default SheetSalerRegister;
