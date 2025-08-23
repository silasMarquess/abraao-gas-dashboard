import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductRegisterContainer = () => {
  return (
    <Card className="flex flex-col items-center border w-[500px] h-auto p-2">
      <CardHeader className="flex flex-row w-full">
        <CardTitle className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-between items-center">
            <Button variant={"outline"} className="text-sm font-light">
              Cancelar
            </Button>
            <Button className="text-sm font-light">Cadastrar Produto</Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};

export default ProductRegisterContainer;
