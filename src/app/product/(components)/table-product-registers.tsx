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
import ListPropertyProduct from "./list-property-product";
import { convertToReal } from "@/helper/format-to-real";
import AddButton from "./add-button";

export interface DeliveryTableRegisterProps {
  productList: Array<GetAllProductsResponse> | undefined;
}

const ProductTableRegister = ({ productList }: DeliveryTableRegisterProps) => {
  return (
    <Table className="table-auto w-full">
      <TableCaption>Lista de Produtos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>descrição</TableHead>
          <TableHead>Tabela/Preços</TableHead>
          <TableHead>Estoques</TableHead>
          <TableHead>Data de Cadastro</TableHead>
          <TableHead>Ultima atualização</TableHead>
          <TableHead className="text-right">***</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productList?.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
              {product.prices.map((price) => (
                <ListPropertyProduct
                  value={convertToReal(price.priceInCents)}
                  key={price.id}
                  id_resources={product.id}
                  url={`/product/prices/${product.id}`}
                  content={price.description}
                />
              ))}
              <AddButton
                url={`/product/prices/register?id_product=${product.id}&name_product=${product.description}`}
              />
            </TableCell>
            <TableCell>
              {product.productStock.map((item) => (
                <ListPropertyProduct
                  value={item.stock}
                  key={item.id}
                  id_resources={product.id}
                  url={`/product/stocks/${product.id}`}
                  content={item.description}
                />
              ))}
              <AddButton
                url={`/product/stocks/register?id_product=${product.id}&name_product=${product.description}`}
              />
            </TableCell>

            <TableCell>{formatToDateBR(product.createdAt)}</TableCell>
            <TableCell>{formatToDateBR(product.updatedAt)}</TableCell>
            <TableCell>
              <ToggleButton
                id_resources={product.id}
                url={`/product/${product.id}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTableRegister;
