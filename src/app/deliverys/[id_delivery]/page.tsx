import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { list } from "../page";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon } from "lucide-react";

export interface DeliveryPageInfoProps {
  params: Promise<{ id_delivery: string }>;
}
const delivery = {
  id: "1",
  fullName: "John Doe",
  dateBirth: "1990-01-01",
  dateIn: "2020-01-01",
};

const DeliveryPageInfo = async ({ params }: DeliveryPageInfoProps) => {
  const { id_delivery } = await params;

  return (
    <div className="w-[400px] h-auto p-4 items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg">{delivery.fullName}</h3>
          </CardTitle>
          <hr></hr>
        </CardHeader>
        <CardContent>
          <p>Data de Nascimento: {delivery.dateBirth}</p>
          <p>Data de Registro: {delivery.dateIn}</p>
          <hr></hr>
        </CardContent>
        <CardFooter>
          <Button>
            <ArrowBigLeftIcon />
            Voltar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeliveryPageInfo;
