import { getAllClientsSchema } from "@/actions/get-all-clients/schema";
import ToggleButton from "@/app/components/toogle-buttons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToDateBR } from "@/helper/format-to-date";

export interface TableRegistersProps {
  registers: Array<getAllClientsSchema> | undefined;
}

const TableClientRegisters = ({ registers }: TableRegistersProps) => {
  if (!registers || registers.length === 0) {
    return <div>No clients found.</div>;
  }

  return (
    <Table className="table-auto w-full">
      <TableCaption>Lista de Regiões.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>Nome do Cliente</TableHead>
          <TableHead>Data de Cadastro</TableHead>
          <TableHead>Região</TableHead>
          <TableHead className="text-right">***</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {registers?.map((client, index) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{client.fullName}</TableCell>
            <TableCell>{formatToDateBR(client.createdAt)}</TableCell>
            <TableCell>{client.region.description}</TableCell>
            <TableCell className="items-end flex flex-row justify-end">
              <ToggleButton
                id_resources={client.region.id}
                url={`/clients/details/`}
                params={`id_client=${client.id}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableClientRegisters;
