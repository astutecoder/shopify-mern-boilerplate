import { jwtDecode } from 'jwt-decode';

import { AppConfigV2 } from '@shopify/app-bridge-core';
import { Provider } from '@shopify/app-bridge-react';
import { Spinner } from '@shopify/polaris';
import { FC, useContext, useState } from 'react';
import { Location, Outlet } from 'react-router-dom';
import { getAuthorized, getIsAuthenticated } from '../service/auth';
import { SHOPIFY_ADMIN_URL } from '../utils/constants/global';
import { AuthContext } from '../utils/context/AuthContext';
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
  const { token, setToken } = useContext(AuthContext);
  const { shop } = generateQueryObject();

  const [isAuth, setIsAuth] = useState(false);

  const handleAuthentication = async (shop: string) => {
    const data = await getIsAuthenticated(shop);

    if (!data.authenticated) {
      await getAuthorized(shop);
      return;
    }

    setToken(data.token);

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
        <Outlet />
      </Provider>
    );
  }

  return <Spinner />;
};

export default ProtectedRoute;
