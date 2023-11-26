import { Button } from '@shopify/polaris';
import { jwtDecode } from 'jwt-decode';
import { FC, PropsWithChildren, useMemo } from 'react';
import {
  SHOPIFY_ADMIN_URL,
  SHOPIFY_CLIENT_ID,
  TOKEN_KEY,
} from '../utils/constants/global';
import { isFromShopify } from '../utils/helpers/shopify-request';

const ShopifyGuard: FC<PropsWithChildren> = ({ children }) => {
  const isWithinShopify = useMemo(() => {
    return window.location.ancestorOrigins.contains(SHOPIFY_ADMIN_URL);
  }, []);

  const handleReload = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      alert('Sorry! Please try to reload manually.');
      return;
    }

    const { shop } = jwtDecode<{ id: string; shop: string }>(token);
    const shopName = shop.split('.')[0];
    const currentPath = window.location.pathname.replace(/^\//, '');

    window.top?.location.replace(
      `${SHOPIFY_ADMIN_URL}/store/${shopName}/apps/${SHOPIFY_CLIENT_ID}/${currentPath}`
    );
  };

  if (!isFromShopify()) {
    return (
      <>
        {isWithinShopify ? (
          <>
            <h2>Sorry! Something unwanted happend</h2>
            <p>
              Try to{' '}
              <Button variant="plain" onClick={handleReload}>
                reload
              </Button>{' '}
              the page
            </p>
          </>
        ) : (
          <>
            <h1>Sorry!</h1>
            <p>Please try to load this app from shopify store admin</p>
          </>
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default ShopifyGuard;
