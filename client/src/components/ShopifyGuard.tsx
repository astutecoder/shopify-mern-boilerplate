import { Button, Card, Page } from '@shopify/polaris';
import { FC, PropsWithChildren, useMemo } from 'react';
import { SHOPIFY_ADMIN_URL } from '../utils/constants/global';
import { isFromShopify } from '../utils/helpers/shopify-request';
import { handleReload } from '../utils/helpers/url';

const ShopifyGuard: FC<PropsWithChildren> = ({ children }) => {
  const isWithinShopify = useMemo(() => {
    return window.location.ancestorOrigins.contains(SHOPIFY_ADMIN_URL);
  }, []);

  if (!isFromShopify()) {
    return (
      <>
        {isWithinShopify ? (
          <Page>
            <Card>
              <h2>Sorry! Something unwanted happend</h2>
              <p>
                Try to{' '}
                <Button variant="plain" onClick={handleReload}>
                  reload
                </Button>{' '}
                the page
              </p>
            </Card>
          </Page>
        ) : (
          <Page>
            <h1>Sorry!</h1>
            <p>Please try to load this app from shopify store admin</p>
          </Page>
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default ShopifyGuard;
