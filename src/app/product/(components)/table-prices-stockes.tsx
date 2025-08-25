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
import { GetAllProductsResponse } from "@/actions/get-all-product/schema";
import DeliveryTableRegister from "@/app/deliverys/components/table-register";
import ToggleButton from "@/app/components/toogle-buttons";
import { getAllTablePriceSchema } from "@/actions/get-all-tablePrices/schema";
import { getAllProductStockSchema } from "@/actions/get-all-productStock/schema";

export interface DeliveryTableRegisterProps {
  productPrices?: Array<getAllTablePriceSchema> | undefined;
  productStocks?: Array<getAllProductStockSchema> | undefined;
}

const productTableRegister = ({
  productPrices,
  productStocks,
}: DeliveryTableRegisterProps) => {
  return productPrices?.length ? (
    <Table className="table-auto w-full">
      <TableCaption>Lista de Preços dos Produtos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>descrição</TableHead>
          <TableHead>Preço Real-BR</TableHead>
          <TableHead>Data de Cadastro</TableHead>
          <TableHead>Ultima atualização</TableHead>
          <TableHead className="text-right">***</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productPrices.map((price, index) => (
          <TableRow key={price.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{price.description}</TableCell>
            <TableCell>{formatToDateBR(price.createdAt)}</TableCell>
            <TableCell>{formatToDateBR(price.updatedAt)}</TableCell>
            <TableCell>
              <ToggleButton
                id_resources={price.id}
                url={`/product/prices/${price.id}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Table className="table-auto w-full">
      <TableCaption>Relação de estoque de Produtos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>descrição</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Data de Cadastro</TableHead>
          <TableHead>Ultima atualização</TableHead>
          <TableHead className="text-right">***</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productStocks?.map((stock, index) => (
          <TableRow key={stock.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{stock.description}</TableCell>
            <TableCell>{stock.stock}</TableCell>
            <TableCell>{formatToDateBR(stock.createdAt)}</TableCell>
            <TableCell>{formatToDateBR(stock.updatedAt)}</TableCell>
            <TableCell>
              <ToggleButton
                id_resources={stock.id}
                url={`/product/stocks/${stock.id}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default productTableRegister;
