import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import z from "zod";
import { id } from "zod/v4/locales";
import { deliveryGetSchema } from "@/actions/get-alldeliverys/schema";
import { formatToDateBR } from "@/helper/format-to-date";

export interface DeliveryTableRegisterProps {
  deliveryList: Array<z.infer<typeof deliveryGetSchema>> | undefined;
}

const DeliveryTableRegister = ({
  deliveryList,
}: DeliveryTableRegisterProps) => {
  console.log("render table with:", deliveryList);
  return (
    <Table className="table-auto w-full">
      <TableCaption>Lista de Entregadores.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>Nome Completo</TableHead>
          <TableHead>Data Admissão</TableHead>
          <TableHead>Data/Nascimento</TableHead>
          <TableHead className="text-right">***</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deliveryList?.map((delivery, index) => (
          <TableRow key={delivery.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{delivery.fullName}</TableCell>
            <TableCell>{formatToDateBR(delivery.dateIn)}</TableCell>
            <TableCell>{formatToDateBR(delivery.birthDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeliveryTableRegister;
