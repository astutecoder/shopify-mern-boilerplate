import { useEffect, useState } from 'react';
import { getProducts } from '../service/products';

export const useListProducts = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts();
        if (products.errors?.length) {
          setErrors(products.errors[0].message);
        } else {
          setProducts(products.data.products.nodes);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log('error', error);
        setErrors(error?.error);
      }
    })();
  }, []);

  return { products, errors };
};
