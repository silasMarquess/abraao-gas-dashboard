import { RegionGetSchema } from "@/actions/get-all-regions/schema";
import ToggleButton from "@/app/components/toogle-buttons";
import AddButton from "@/app/product/(components)/add-button";
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

export interface PageProps {
  regionList: Array<RegionGetSchema> | undefined;
}

const TableRegionRegisters = ({ regionList }: PageProps) => {
  if (!regionList || regionList.length === 0) return <div>sem dados</div>;

  return (
    <Table className="table-auto w-full">
      <TableCaption>Lista de Regiões.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>Nome da Região</TableHead>
          <TableHead>Data de Cadastro</TableHead>
          <TableHead>Numero de Clientes</TableHead>
          <TableHead className="text-right">***</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {regionList?.map((region, index) => (
          <TableRow key={region.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{region.description}</TableCell>
            <TableCell>{formatToDateBR(region.createdAt)}</TableCell>
            <TableCell>
              <div className="flex flex-col items-center">
                {" "}
                {region.clients.length} Cadastrados
                <AddButton key={region.id} url="/clients/register" />
              </div>
            </TableCell>
            <TableCell className="items-end flex flex-row justify-end">
              <ToggleButton
                id_resources={region.id}
                url={`/regions/${region.id}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableRegionRegisters;
