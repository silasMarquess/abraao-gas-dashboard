export interface StockPageProps {
  params: Promise<{ id_stock: string }>;
}

const StockPage = async ({ params }: StockPageProps) => {
  const { id_stock } = await params;
  return <div>Stock Page: {id_stock}</div>;
};

export default StockPage;
