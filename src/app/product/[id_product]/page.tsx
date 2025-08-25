export interface ProductInfoPageProps {
  params: Promise<{ id_product: string }>;
}

const ProductInfoPage = async ({ params }: ProductInfoPageProps) => {
  const { id_product } = await params;
  return <div>Pagina do produto: {id_product}</div>;
};

export default ProductInfoPage;
