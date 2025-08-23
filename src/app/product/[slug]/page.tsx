export interface ProductInfoPageProps {
  params: Promise<{ slug: string }>;
}

const ProductInfoPage = async ({ params }: ProductInfoPageProps) => {
  const { slug } = await params;
  return <div>Pagina do produtco: {slug}</div>;
};

export default ProductInfoPage;
