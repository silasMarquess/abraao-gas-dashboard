export interface PricePageProps {
  params: Promise<{ id_price: string }>;
}
const PricePage = async ({ params }: PricePageProps) => {
  const { id_price } = await params;
  return <div>Price Page: {id_price}</div>;
};

export default PricePage;
