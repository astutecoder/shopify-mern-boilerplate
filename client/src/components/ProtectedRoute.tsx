import { jwtDecode } from 'jwt-decode';

import { AppConfigV2 } from '@shopify/app-bridge-core';
import { NavigationMenu, Provider } from '@shopify/app-bridge-react';
import { FC, useState } from 'react';
import { Location, Outlet } from 'react-router-dom';
import { Spinner } from '@shopify/polaris';
import { getAuthorized, getIsAuthenticated } from '../service/auth';
import { SHOPIFY_ADMIN_URL, TOKEN_KEY } from '../utils/constants/global';
import { generateAppUrl, generateQueryObject } from '../utils/helpers/url';

type ProtectedRouteProps = {
  config: AppConfigV2;
  router: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    location: Location<any>;
    history: {
      replace: (path: string) => void;
    };
  };
};
const ProtectedRoute: FC<ProtectedRouteProps> = ({ config, router }) => {
  // check if access-token present and valid
  const token = localStorage.getItem(TOKEN_KEY);
  const { shop } = generateQueryObject();

  const [isAuth, setIsAuth] = useState(false);

  const handleAuthentication = async (shop: string) => {
    const data = await getIsAuthenticated(shop);

    if (!data.authenticated) {
      await getAuthorized(shop);
      return;
    }
    localStorage.setItem(TOKEN_KEY, data.token);

    const parent = window.location.ancestorOrigins;
    if (!parent.contains(SHOPIFY_ADMIN_URL)) {
      const shopName = shop.split('.')[0];
      const redirectUrl = generateAppUrl(shopName);

      window.location.replace(redirectUrl);
      return;
    }
    setIsAuth(true);
  };

  if (shop) {
    (async () => {
      await handleAuthentication(shop);
    })();
  } else if (token) {
    (async () => {
      const decoded = jwtDecode<{ id: string; shop: string }>(token);
      await handleAuthentication(decoded.shop);
    })();
  }

  if (isAuth) {
    return (
      <Provider config={config} router={router}>
        <NavigationMenu
          navigationLinks={[
            {
              label: 'Products',
              destination: '/products',
            },
          ]}
        />
        <Outlet />
      </Provider>
    );
  }

  return <Spinner />;
};

export default ProtectedRoute;
