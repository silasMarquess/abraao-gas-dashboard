"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import z, { string } from "zod";
import { getAllClientsSchema } from "@/actions/get-all-clients/schema";
import { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { createSalerSchema } from "@/actions/create-new-saler/schema";

export interface pageProps {
  clientList: Array<getAllClientsSchema> | undefined;
  fieldValue: ControllerRenderProps<
    z.infer<typeof createSalerSchema>,
    "id_client"
  >;
  form: UseFormReturn<
    z.infer<typeof createSalerSchema>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    z.infer<typeof createSalerSchema>
  >;
}

export default function ClientListCombobox({
  form,
  clientList,
  fieldValue,
}: pageProps) {
  const [open, setOpen] = useState<boolean>(false);

  if (!clientList) return <div>Loading...</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            fieldValue.value && "font-semibold text-muted-foreground"
          )}
        >
          {fieldValue.value
            ? clientList.find((client) => client.id === fieldValue.value)
                ?.fullName
            : "Selecione um cliente Cadastrado..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Selecione um cliente.." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum client encontrado</CommandEmpty>
            <CommandGroup>
              {clientList.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.fullName}
                  onSelect={(currentValue) => {
                    form.setValue("id_client", client.id);
                    setOpen(false);
                  }}
                >
                  {client.fullName}
                  <Check
                    className={cn(
                      "ml-auto",
                      client.id === fieldValue.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
