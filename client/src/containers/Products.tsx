import { useListProducts } from '../hooks/products';

const Products = () => {
  const { products, errors } = useListProducts();

  if (errors) return <h2>{errors}</h2>;

  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {products.map((product: any) => {
        return <h2 key={product.id}>{product.title}</h2>;
      })}
    </div>
  );
};

export default Products;
