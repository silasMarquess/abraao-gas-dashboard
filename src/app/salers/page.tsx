import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesPage = () => {
  return (
    <div className="flex flex-col justify-start items-center h-full w-full p-3">
      <div className="flex flex-row items-center justify-center w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <h3 className="font-semibold text-xl">Registro de Vendas</h3>
              <p className="text-sm text-muted-foreground font-light">
                Visualize, gerencie e cadastre todas as vendas realizadas.
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Conteúdo do cartão</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPage;
