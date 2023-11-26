import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import { Button, Spinner } from '@shopify/polaris';
import { useState } from 'react';
import { useListProducts } from '../hooks/products';

const Products = () => {
  const { products, errors, loading } = useListProducts();
  const [openPicker, setOpenPicker] = useState(false);

  const toggleOpenPicker = () => {
    setOpenPicker((prev) => !prev);
  };

  if (errors) return <h2>{errors}</h2>;

  return (
    <>
      <TitleBar title="Products" />
      <ResourcePicker open={openPicker} resourceType="Product" />
      <Button onClick={toggleOpenPicker}>Click to open</Button>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {loading ? (
          <Spinner />
        ) : (
          <>
            {products.map((product: any) => {
              return <h2 key={product.id}>{product.title}</h2>;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Products;
